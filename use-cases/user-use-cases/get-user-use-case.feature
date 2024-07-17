Feature: Use Case To Get User

    Scenario Outline: It Should Successfully Get User
        Given userId : '<userId>', companyId : '<companyId>' for get user
        When try to get result for get user
        Then it should return the result : '<result>' for get user

        Examples:
            | userId | companyId | result                                                                                                                                                                                     |
            | 1      | 1         | {"userId":1,"rollId":64,"roll":{"channelPermission":{"read":1,"write":1,"delete":1},"userPermission":{"read":1,"write":1,"delete":1},"productPermission":{"read":1,"write":1,"delete":1}}} |

    Scenario Outline: It Should Throw Error For Get User
        Given userId : '<userId>', companyId : '<companyId>' for get user
        When try to get result for get user
        Then it should return the error : '<error>' for get user

        Examples:
            | userId | companyId | error                                                                                                                                                                                     |
            | 2      | 1         | user dont exists in your company |
