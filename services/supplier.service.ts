import DB from "../config/postgres-db";
import { CreateSupplierDTO } from "../dtos/supplier.dto";
import { Supplier } from "../interfaces/supplier.interface";
import { NotFound } from "../errors/NotFound";
import { AlreadyExists } from "../errors/AlreadyExists";

class SupplierService {
    public Supplier = DB.Supplier

    public async findAllSuppliers(): Promise<Supplier[]> {
        const allSuppliers: Supplier[] = await this.Supplier.findAll()
        return allSuppliers
    }

    public async findSupplierById(SupplierId: number): Promise<Supplier> {
        const singleSupplier: Supplier = await this.Supplier.findByPk(SupplierId)

        if (!singleSupplier) throw new NotFound('Supplier')

        return singleSupplier
    }

    public async createSupplier(SupplierData: CreateSupplierDTO): Promise<Supplier> {
        const findSupplier: Supplier = await this.Supplier.findOne({ where: { supplierName: SupplierData.supplierName } })

        if (findSupplier) throw new AlreadyExists('Supplier')

        const createdSupplierData: Supplier = await this.Supplier.create({ ...SupplierData })

        return createdSupplierData
    }

    public async updateSupplier(SupplierId: number, SupplierData: CreateSupplierDTO): Promise<Supplier> {
        const findSupplier: Supplier = await this.Supplier.findOne({ where: { id: SupplierData.id } })

        if (!findSupplier) throw new NotFound('Supplier')

        await this.Supplier.update({ ...SupplierData }, { where: { id: SupplierId } })

        const updatedSupplier = await this.Supplier.findByPk(SupplierId)

        return updatedSupplier
    }

    public async deleteSupplier(SupplierId: number): Promise<Supplier> {
        const findSupplier: Supplier = await this.Supplier.findByPk(SupplierId)

        await this.Supplier.destroy({ where: { id: SupplierId } })

        return findSupplier
    }
}

export default SupplierService