Feature: Use Case To Get All Product

    Scenario Outline: It Should Successfully Get All Product
        Given companyId : '<companyId>', queryStringObj : '<queryStringObj>' for get all product
        When try to get result for get all product
        Then it should return the result : '<result>' for get all product

        Examples:
            | companyId | queryStringObj | result                                                                                              |
            | 1         | {"limit" : 5}  | [{"productId":1,"price":11,"companyId":1,"productName":"Product One","description":"Good Product"}] |
