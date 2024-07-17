Feature: Use Case To Update Product

    Scenario Outline: It Should Successfully Update Product
        Given productId : '<productId>', fields : '<fields>', files : '<files>', companyId : '<companyId>' for update product
        When try to get result for update product
        Then it should return the result : '<result>' for update product

        Examples:
            | productId | fields             | files                                 | companyId | result                                                                         |
            | 1         | {"price" : ["11"]} | {"image" : [{"mimetype" : "image/"}]} | 1         | {"productId":1,"price":11,"imageUrl":"abc.image.cloudinary.com","companyId":1} |

    Scenario Outline: It Should Throw Error For Update Product
        Given productId : '<productId>', fields : '<fields>', files : '<files>', companyId : '<companyId>' for update product
        When try to get result for update product
        Then it should return the error : '<error>' for update product

        Examples:
            | productId | fields             | files                                 | companyId | error                    |
            | 1         | {}                 | {"image" : [{"mimetype" : "image/"}]} | 1         | price required           |
            | 1         | {"price" : [""]}   | {"image" : [{"mimetype" : "image/"}]} | 1         | "price" must be a number |
            | 2         | {"price" : ["11"]} | {"image" : [{"mimetype" : "image/"}]} | 1         | product dont exists      |
            | 1         | {"price" : ["11"]} | {"image" : [{"mimetype" : "video/"}]} | 1         | accept only image file   |