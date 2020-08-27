## 1.引入数据库
```
//app.module.ts
MongooseModule.forRoot('mongodb://localhost/nestdata')
```

## 2.创建集合

```
//users.schema.ts
import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
    description: String,
})
```

## 3.在引用的模块中导入该集合
```
//users.module.ts
imports: [
    MongooseModule.forFeature([
        {name: 'UserOne', schema: UserSchema}
    ])
]
```

## 4.在服务层使用该集合

```
//users.service.ts
constructor(
        @InjectModel('UserOne')
        private readonly userOneModel: Model<Customer>
    ) {}

//增删查改
async getAllCustomer(): Promise<Customer[]> {
        const customer = await this.userOneModel.find().exec();
        return customer;
    }

    async addCustomer(createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const newCustomer = new this.userOneModel(createCustomerDTO);
        return await newCustomer.save();
    }

    async getCustomer(customerID): Promise<Customer> {
        const customer = await this.userOneModel.findById(customerID).exec();
        return customer;
    }

    async updateCustomer(customerID: string, createCustomerDTO: CreateCustomerDTO): Promise<Customer> {
        const updatedCustomer = await this.userOneModel
            .findByIdAndUpdate(customerID, createCustomerDTO, { new: true });
        return updatedCustomer;
    }

    async deleteCustomer(customerID): Promise<any> {
        const deletedCustomer = await this.userOneModel.findByIdAndRemove(customerID);
        return deletedCustomer;
    }
```

## 5.在控制层使用服务

```
//users.controller.ts
@Post('/create')
    async addCustomer(@Res() resizeBy, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.userService.addCustomer(createCustomerDTO);
        resizeBy.status(HttpStatus.OK).json({
            message: "Customer has been created successfully",
            customer
        })
    }

    @Get('customers')
    async getAllCustomer(@Res() res) {
        const customers = await this.userService.getAllCustomer();
        res.status(HttpStatus.OK).json(customers);
    }

    @Get('customer/:customerID')
    async getCustomer(@Res() res, @Param('customerID') customerID) {
        const customer = await this.userService.getCustomer(customerID);
        if (!customer) {
            throw new NotFoundException('Customer does not exist!');
        }
        res.status(HttpStatus.OK).json(customer);
    }

    @Put('/update')
    async updateCustomer(@Res() res, @Query('customerID') customerID, @Body() createCustomerDTO: CreateCustomerDTO) {
        const customer = await this.userService.updateCustomer(customerID, createCustomerDTO);
        if (!customer) throw new NotFoundException('Customer does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been successfully updated',
            customer
        });
    }

    @Delete('/delete')
    async deleteCustomer(@Res() res, @Query('customerID') customerID) {
        const customer = await this.userService.deleteCustomer(customerID);
        if (!customer) throw new NotFoundException('Customer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Customer has been deleted',
            customer
        })
    }
```