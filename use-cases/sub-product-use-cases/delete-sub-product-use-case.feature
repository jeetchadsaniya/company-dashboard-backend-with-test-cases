Feature: Use Case To Delete Sub Product

    Scenario Outline: It Should Successfully Delete Sub Product
        Given subProductId : '<subProductId>',companyId : '<companyId>' for delete sub product
        When try to get result for delete sub product
        Then it should return the result : '<result>' for delete sub product

        Examples:
            | subProductId | companyId | result                                                                                     |
            | 1            | 1         | {"subProductId":1,"productName":"Product One","channelId":"2","productId":1,"companyId":1} |

    Scenario Outline: It Should Throw Error For Delete Sub Product
        Given subProductId : '<subProductId>',companyId : '<companyId>' for delete sub product
        When try to get result for delete sub product
        Then it should return the error : '<error>' for delete sub product

        Examples:
            | subProductId | companyId | error                               |
            | 2            | 1         | sub-product dont exists             |
            | 3            | 1         | you dont delete english sub product |
