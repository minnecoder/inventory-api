import DB from "../config/postgres-db";
import { CreateProductReviewDTO } from "../dtos/productReview.dto";
import { ProductReview } from "../interfaces/productReview.interface";
import { NotFound } from "../errors/NotFound";
import { AlreadyExists } from "../errors/AlreadyExists";

class ProductReviewService {
    public ProductReview = DB.ProductReview

    public async findAllProductReviews(): Promise<ProductReview[]> {
        const allProductReviews: ProductReview[] = await this.ProductReview.findAll()
        return allProductReviews
    }

    public async findProductReviewById(ProductReviewId: number): Promise<ProductReview> {
        const singleProductReview: ProductReview = await this.ProductReview.findByPk(ProductReviewId)

        if (!singleProductReview) throw new NotFound('ProductReview')

        return singleProductReview
    }

    public async createProductReview(ProductReviewData: CreateProductReviewDTO): Promise<ProductReview> {
        const findProductReview: ProductReview = await this.ProductReview.findOne({ where: { id: ProductReviewData.id } })

        if (findProductReview) throw new AlreadyExists('ProductReview')

        // Check if productId is valid
        const findProduct: ProductReview = await this.ProductReview.findOne({ where: { id: ProductReviewData.productId } })
        if (!findProduct) throw new NotFound('Product')

        // Check if userId is valid
        const findUser: ProductReview = await this.ProductReview.findOne({ where: { id: ProductReviewData.userId } })
        if (!findUser) throw new NotFound('User')

        const createdProductReviewData: ProductReview = await this.ProductReview.create({ ...ProductReviewData })

        return createdProductReviewData
    }

    public async updateProductReview(ProductReviewId: number, ProductReviewData: CreateProductReviewDTO): Promise<ProductReview> {
        const findProductReview: ProductReview = await this.ProductReview.findOne({ where: { id: ProductReviewData.id } })

        if (!findProductReview) throw new NotFound('ProductReview')

        // Check if productId is valid
        const findProduct: ProductReview = await this.ProductReview.findOne({ where: { id: ProductReviewData.productId } })
        if (!findProduct) throw new NotFound('Product')

        // Check if userId is valid
        const findUser: ProductReview = await this.ProductReview.findOne({ where: { id: ProductReviewData.userId } })
        if (!findUser) throw new NotFound('User')

        await this.ProductReview.update({ ...ProductReviewData }, { where: { id: ProductReviewId } })

        const updatedProductReview = await this.ProductReview.findByPk(ProductReviewId)

        return updatedProductReview
    }

    public async deleteProductReview(ProductReviewId: number): Promise<ProductReview> {
        const findProductReview: ProductReview = await this.ProductReview.findByPk(ProductReviewId)

        await this.ProductReview.destroy({ where: { id: ProductReviewId } })

        return findProductReview
    }
}

export default ProductReviewService