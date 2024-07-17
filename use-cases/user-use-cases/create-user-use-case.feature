Feature: Use Case To Create User

    Scenario Outline: It Should Successfully Create User
        Given userName : '<userName>', email : '<email>',companyId : '<companyId>', userId : '<userId>', roll : '<roll>' for create user
        When try to get result for create user
        Then it should return the result : '<result>' for create user

        Examples:
            | userName | email          | companyId | userId | roll                                                                                                                                                                               | result                          |
            | jeet     | jeet@gmail.com | 1         | 1      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | {"accessToken" : "accessToken"} |

    Scenario Outline: It Should Throw Error For Create User
        Given userName : '<userName>', email : '<email>',companyId : '<companyId>', userId : '<userId>', roll : '<roll>' for create user
        When try to get result for create user
        Then it should return the error : '<error>' for create user


        Examples:
            | userName | email          | companyId | userId | roll                                                                                                                                                                               | error                                 |
            |          | jeet@gmail.com | 1         | 1      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | "userName" is not allowed to be empty |
            | jeet     |                | 1         | 1      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | "email" is not allowed to be empty    |
            | jeet     | jeet@          | 1         | 1      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | "email" must be a valid email         |
            | jeet     | jeet@gmail.com | 1         | 1      | {}                                                                                                                                                                                 | "channelPermission" is required       |
            | jeet     | jeet@gmail.com | 1         | 1      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}}                                                          | "userPermission" is required          |
            | jeet     | jeet@gmail.com | 1         | 1      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1}}                                                             | "productPermission" is required       |
            | jeet     | abc@gmail.com  | 1         | 1      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | user already exists in your company   |
            | jeet     | jeet@gmail.com | 1         | 1      | {"channelPermission" : {"read" : 0,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | enter right permission                |