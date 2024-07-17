Feature: Use Case To Create Product

    Scenario Outline: It Should Successfully Create Product
        Given fields : '<fields>', files : '<files>', companyId : '<companyId>' for create product
        When try to get result for create product
        Then it should return the result : '<result>' for create product

        Examples:
            | fields                                                                              | files                                 | companyId | result                                  |
            | {"productName" : ["Product One"],"price" : ["11"],"description" : ["Good Product"]} | {"image" : [{"mimetype" : "image/"}]} | 1         | {"productId" : 1, "subProductDbId" : 1} |

    Scenario Outline: It Should Throw Error For Create Product
        Given fields : '<fields>', files : '<files>', companyId : '<companyId>' for create product
        When try to get result for create product
        Then it should return the error : '<error>' for create product

        Examples:
            | fields                                                                              | files                                 | companyId | error                                        |
            | {"price" : ["11"],"description" : ["Good Product"]}                                 | {"image" : [{"mimetype" : "image/"}]} | 1         | productName, price, description key required |
            | {"productName" : ["Product One"],"price" : ["11"],"description" : ["Good Product"]} | {}                                    | 1         | image is required                            |
            | {"productName" : ["Product One"],"price" : ["11"],"description" : ["Good Product"]} | {"image" : [{"mimetype" : "video/"}]} | 1         | accept only image file                       |
            | {"productName" : [""],"price" : ["11"],"description" : ["Good Product"]}            | {"image" : [{"mimetype" : "image/"}]} | 1         | "productName" is not allowed to be empty     |
            | {"productName" : ["Product One"],"price" : [""],"description" : ["Good Product"]}   | {"image" : [{"mimetype" : "image/"}]} | 1         | "price" must be a number                     |
            | {"productName" : ["Product One"],"price" : ["11"],"description" : [""]}             | {"image" : [{"mimetype" : "image/"}]} | 1         | "description" is not allowed to be empty     |
            | {"productName" : ["Product Two"],"price" : ["11"],"description" : ["Good Product"]} | {"image" : [{"mimetype" : "image/"}]} | 1         | productName already exist in your company    |
