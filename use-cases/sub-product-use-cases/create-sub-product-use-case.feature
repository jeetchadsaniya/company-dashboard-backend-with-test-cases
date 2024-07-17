Feature: Use Case To Create Sub Product

    Scenario Outline: It Should Successfully Create Sub Product
        Given productName : '<productName>', description : '<description>', channelId : '<channelId>', productId : '<productId>', companyId : '<companyId>' for create sub product
        When try to get result for create sub product
        Then it should return the result : '<result>' for create sub product

        Examples:
            | productName | description  | channelId | productId | companyId | result               |
            | Product One | Good Product | 1         | 1         | 1         | {"subProductId" : 5} |

    Scenario Outline: It Should Throw Error For Create Sub Product
        Given productName : '<productName>', description : '<description>', channelId : '<channelId>', productId : '<productId>', companyId : '<companyId>' for create sub product
        When try to get result for create sub product
        Then it should return the error : '<error>' for create sub product

        Examples:
            | productName | description  | channelId | productId | companyId | error                                                                  |
            |             | Good Product | 1         | 1         | 1         | "productName" is not allowed to be empty |
            | Product One |             | 1         | 1         | 1         | "description" is not allowed to be empty |
            | Product One | Good Product |          | 1         | 1         | "channelId" must be a number|
            | Product One | Good Product | 1         |           | 1         | "productId" must be a number |
            | Product One | Good Product | 2         | 1         | 1         | channel not exists with given channelId in your company                |
            | Product One | Good Product | 1         | 2         | 1         | product not exists with given productId in your company                |
            | Product Two | Good Product | 1         | 3         | 1         | sub-product already exists with given productId and channelId          |
            | Product Two | Good Product | 1         | 3         | 1         | sub-product already exists with given productId and channelId          |
            | Product Two | Good Product | 1         | 1         | 1         | same name subProduct exist in your company plz enter other productName |