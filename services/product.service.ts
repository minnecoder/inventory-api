import DB from "../config/postgres-db";
import { CreateProductDTO } from "../dtos/product.dto";
import { Product } from "../interfaces/product.interface";
import { NotFound } from "../errors/NotFound";
import { AlreadyExists } from "../errors/AlreadyExists";

class ProductService {
    public Product = DB.Product

    public async findAllProducts(): Promise<Product[]> {
        const allProducts: Product[] = await this.Product.findAll()
        return allProducts
    }

    public async findProductById(ProductId: number): Promise<Product> {
        const singleProduct: Product = await this.Product.findByPk(ProductId)

        if (!singleProduct) throw new NotFound('Product')

        return singleProduct
    }

    public async createProduct(ProductData: CreateProductDTO): Promise<Product> {
        const findProduct: Product = await this.Product.findOne({ where: { productName: ProductData.productName } })

        if (findProduct) throw new AlreadyExists('Product')

        const createdProductData: Product = await this.Product.create({ ...ProductData })

        return createdProductData
    }

    public async updateProduct(ProductId: number, ProductData: CreateProductDTO): Promise<Product> {
        const findProduct: Product = await this.Product.findOne({ where: { id: ProductData.id } })

        if (!findProduct) throw new NotFound('Product')

        await this.Product.update({ ...ProductData }, { where: { id: ProductId } })

        const updatedProduct = await this.Product.findByPk(ProductId)

        return updatedProduct
    }

    public async deleteProduct(ProductId: number): Promise<Product> {
        const findProduct: Product = await this.Product.findByPk(ProductId)

        await this.Product.destroy({ where: { id: ProductId } })

        return findProduct
    }
}

export default ProductService