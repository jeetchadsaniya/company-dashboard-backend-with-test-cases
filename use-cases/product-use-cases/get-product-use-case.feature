Feature: Use Case To Get Product

    Scenario Outline: It Should Successfully Get Product
        Given productId : '<productId>',companyId : '<companyId>' for get product
        When try to get result for get product
        Then it should return the result : '<result>' for get product

        Examples:
            | productId | companyId | result                                                                                                |
            | 1         | 1         | {"productId" : 1,"price" : 11,"companyId":1,"productName" : "Product One","description" : "Good One"} |

Scenario Outline: It Should Throw Error For Get Product
    Given productId : '<productId>',companyId : '<companyId>' for get product
    When try to get result for get product
    Then it should return the error : '<error>' for get product

    Examples:
        | productId | companyId | error               |
        | 2         | 1         | product dont exists |

