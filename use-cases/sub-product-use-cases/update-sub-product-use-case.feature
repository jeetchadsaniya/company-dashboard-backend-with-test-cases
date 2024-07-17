Feature: Use Case To Update Sub Product

    Scenario Outline: It Should Successfully Update Sub Product
        Given subProductId : '<subProductId>', productName : '<productName>', description : '<description>', companyId : '<companyId>' for update sub product
        When try to get result for update sub product
        Then it should return the result : '<result>' for update sub product

        Examples:
            | subProductId | productName | description  | companyId | result                                                                                    |
            | 1            | Product One | Good Product | 1         | {"subProductId":1,"productName":"Product One","description":"Good Product","companyId":1} |

    Scenario Outline: It Should Throw Error For Update Sub Product
        Given subProductId : '<subProductId>', productName : '<productName>', description : '<description>', companyId : '<companyId>' for update sub product
        When try to get result for update sub product
        Then it should return the error : '<error>' for update sub product

        Examples:
            | subProductId | productName | description  | companyId | error                                                    |
            | 1            |             | Good Product | 1         | "productName" is not allowed to be empty                 |
            | 1            | Product One |              | 1         | "description" is not allowed to be empty                 |
            | 2            | Product One | Good One     | 1         | sub-product dont exists                                  |
            | 1            | Product Two | Good One     | 1         | sub-product exists in your company with same productName |