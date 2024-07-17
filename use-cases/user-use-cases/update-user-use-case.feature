Feature: Use Case To Update User

    Scenario Outline: It Should Successfully Update User
        Given userName : '<userName>', companyId : '<companyId>', userId : '<userId>', roll : '<roll>' for update user
        When try to get result for update user
        Then it should return the result : '<result>' for update user

        Examples:
            | userName | companyId | userId | roll                                                                                                                                                                               | result                                                   |
            | jeet     | 1         | 4      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | {"userId":4,"companyId":1,"userName":"jeet","rollId":64} |

    Scenario Outline: It Should Throw Error For Update User
        Given userName : '<userName>', companyId : '<companyId>', userId : '<userId>', roll : '<roll>' for update user
        When try to get result for update user
        Then it should return the error : '<error>' for update user

        Examples:
            | userName | companyId | userId | roll                                                                                                                                                                               | error                                 |
            |          | 1         | 4      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | "userName" is not allowed to be empty |
            | jeet     | 1         | 4      | {}                                                                                                                                                                                 | "channelPermission" is required       |
            | jeet     | 1         | 4      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}}                                                          | "userPermission" is required          |
            | jeet     | 1         | 4      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1}}                                                             | "productPermission" is required       |
            | jeet     | 1         | 2      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | user dont exists in your company      |
            | jeet     | 1         | 3      | {"channelPermission" : {"read" : 1,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | dont allow to edit admin user         |
            | jeet     | 1         | 4      | {"channelPermission" : {"read" : 0,"write" : 1, "delete" :1},"userPermission" : {"read" : 1,"write" : 1, "delete" :1},"productPermission" : {"read" : 1,"write" : 1, "delete" :1}} | enter right permission                |

