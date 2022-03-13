import { NextFunction, Request, Response } from "express";
import { CreateCustomerDTO } from "../dtos/customer.dto";
import { Customer } from "../interfaces/customer.interface";
import CustomerService from "../services/customer.service";

class CustomerController {
    public CustomerService = new CustomerService()

    public getCustomers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllCustomersData: Customer[] = await this.CustomerService.findAllCustomers()

            return res.status(200).json({
                data: findAllCustomersData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const CustomerId = Number(req.params.id)
            const findSingleCustomerData = await this.CustomerService.findCustomerById(CustomerId)

            return res.status(200).json({
                data: findSingleCustomerData
            })
        } catch (error) {
            next(error)
        }
    }

    public addCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const CustomerData: CreateCustomerDTO = req.body
            const createCustomerData: Customer = await this.CustomerService.createCustomer(CustomerData)

            return res.status(200).json({
                data: createCustomerData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const CustomerId = Number(req.params.id)
            const CustomerData: CreateCustomerDTO = req.body
            const updateCustomer: Customer = await this.CustomerService.updateCustomer(CustomerId, CustomerData)

            return res.status(200).json({
                data: updateCustomer
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteCustomer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const CustomerId = Number(req.params.id)
            const deleteCustomerData = await this.CustomerService.deleteCustomer(CustomerId)

            return res.status(200).json({
                data: deleteCustomerData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default CustomerController