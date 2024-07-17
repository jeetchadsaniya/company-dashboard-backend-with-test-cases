Feature: Use Case To Delete Product

    Scenario Outline: It Should Successfully Delete Product
        Given productId : '<productId>',companyId : '<companyId>' for delete product
        When try to get result for delete product
        Then it should return the result : '<result>' for delete product

        Examples:
            | productId | companyId | result                                       |
            | 1         | 1         | {"productId" : 1,"price" : 11,"companyId":1} |

    Scenario Outline: It Should Throw Error For Delete Product
        Given productId : '<productId>',companyId : '<companyId>' for delete product
        When try to get result for delete product
        Then it should return the error : '<error>' for delete product

        Examples:
            | productId | companyId | error               |
            | 2         | 1         | product not exist in your company |

