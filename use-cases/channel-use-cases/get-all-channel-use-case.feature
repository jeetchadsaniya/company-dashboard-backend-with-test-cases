Feature: Use Case To Get All Channel

    Scenario Outline: It Should Successfully Get All Channel
        Given companyId : '<companyId>', queryStringObj : '<queryStringObj>' for get all channel
        When try to get result for get all channel
        Then it should return the result : '<result>' for get all channel

        Examples:
            | companyId | queryStringObj | result                                                                             |
            | 1         | {"limit" : 5}     | [{"companyId":1,"channelId":1,"channelCode":"en","channelName":"english"}] |
