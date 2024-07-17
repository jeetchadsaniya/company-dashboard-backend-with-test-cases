Feature: Use Case To Create Channel

    Scenario Outline: It Should Successfully Create Channel
        Given channelName : '<channelName>', channelCode : '<channelCode>', companyId : '<companyId>' for create channel
        When try to get result for create channel
        Then it should return the result : '<result>' for create channel

        Examples:
            | channelName | channelCode | companyId | result                  |
            | hindi       | hi          | 1         | {"insertedChannelId":1} |

    Scenario Outline: It Should Throw Error For Create Channel
        Given channelName : '<channelName>', channelCode : '<channelCode>', companyId : '<companyId>' for create channel
        When try to get result for create channel
        Then it should return the error : '<error>' for create channel

        Examples:
            | channelName | channelCode | companyId | error                                                         |
            |             | hi          | 1         | "channelName" is not allowed to be empty                      |
            | hindi       |             | 1         | "channelCode" is not allowed to be empty                      |
            | marathi     | ma          | 1         | channel already exists with same channel code in your company |
            | gujrati     | gu          | 1         | channel already exists with same channel Name in your company |