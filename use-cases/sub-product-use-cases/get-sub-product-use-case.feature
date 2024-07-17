Feature: Use Case To Get Sub Product

    Scenario Outline: It Should Successfully Get Sub Product
        Given subProductId : '<subProductId>',companyId : '<companyId>' for get sub product
        When try to get result for get sub product
        Then it should return the result : '<result>' for get sub product

        Examples:
            | subProductId | companyId | result                                                                                     |
            | 1            | 1         | {"subProductId":1,"productName":"Product One","channelId":"1","productId":1,"companyId":1} |

    Scenario Outline: It Should Throw Error For Get Sub Product
        Given subProductId : '<subProductId>',companyId : '<companyId>' for get sub product
        When try to get result for get sub product
        Then it should return the error : '<error>' for get sub product

        Examples:
            | subProductId | companyId | error                   |
            | 2            | 1         | sub-product dont exists |
