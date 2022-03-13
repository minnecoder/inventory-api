import DB from "../config/postgres-db";
import { CreateProductSupplierDTO } from "../dtos/productSupplier.dto";
import { ProductSupplier } from "../interfaces/productSupplier.interface";
import { NotFound } from "../errors/NotFound";
import { AlreadyExists } from "../errors/AlreadyExists";

class ProductSupplierService {
    public ProductSupplier = DB.ProductSupplier

    public async findAllProductSuppliers(): Promise<ProductSupplier[]> {
        const allProductSuppliers: ProductSupplier[] = await this.ProductSupplier.findAll()
        return allProductSuppliers
    }

    public async findProductSupplierById(ProductSupplierId: number): Promise<ProductSupplier> {
        const singleProductSupplier: ProductSupplier = await this.ProductSupplier.findByPk(ProductSupplierId)

        if (!singleProductSupplier) throw new NotFound('ProductSupplier')

        return singleProductSupplier
    }

    public async createProductSupplier(ProductSupplierData: CreateProductSupplierDTO): Promise<ProductSupplier> {
        const findProductSupplier: ProductSupplier = await this.ProductSupplier.findOne({ where: { id: ProductSupplierData.id } })

        if (findProductSupplier) throw new AlreadyExists('ProductSupplier')

        const createdProductSupplierData: ProductSupplier = await this.ProductSupplier.create({ ...ProductSupplierData })

        return createdProductSupplierData
    }

    public async updateProductSupplier(ProductSupplierId: number, ProductSupplierData: CreateProductSupplierDTO): Promise<ProductSupplier> {
        const findProductSupplier: ProductSupplier = await this.ProductSupplier.findOne({ where: { id: ProductSupplierData.id } })

        if (!findProductSupplier) throw new NotFound('ProductSupplier')

        await this.ProductSupplier.update({ ...ProductSupplierData }, { where: { id: ProductSupplierId } })

        const updatedProductSupplier = await this.ProductSupplier.findByPk(ProductSupplierId)

        return updatedProductSupplier
    }

    public async deleteProductSupplier(ProductSupplierId: number): Promise<ProductSupplier> {
        const findProductSupplier: ProductSupplier = await this.ProductSupplier.findByPk(ProductSupplierId)

        await this.ProductSupplier.destroy({ where: { id: ProductSupplierId } })

        return findProductSupplier
    }
}

export default ProductSupplierService