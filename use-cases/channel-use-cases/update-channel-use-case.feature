Feature: Use Case To Update Channel

    Scenario Outline: It Should Successfully Create Channel
        Given channelId : '<channelId>', channelName : '<channelName>', channelCode : '<channelCode>', companyId : '<companyId>' for update channel
        When try to get result for update channel
        Then it should return the result : '<result>' for update channel

        Examples:
            | channelId | channelName | channelCode | companyId | result                                                                             |
            | 2         | gujrati     | gu          | 1         | {"channelId" : 2,"channelName" : "gujrati", "channelCode" : "gu","companyId" : 1 } |

    Scenario Outline: It Should Throw Error For Update Channel
        Given channelId : '<channelId>', channelName : '<channelName>', channelCode : '<channelCode>', companyId : '<companyId>' for update channel
        When try to get result for update channel
        Then it should return the error : '<error>' for update channel

        Examples:
            | channelId | channelName | channelCode | companyId | error                                                         |
            | 2         |             | gu          | 1         | "channelName" is not allowed to be empty                      |
            | 2         | gujrati     |             | 1         | "channelCode" is not allowed to be empty                      |
            | 3         | marathi     | ma          | 1         | channel dont exists                                           |
            | 1         | english     | en          | 1         | dont allow to change english channel                          |
            | 2         | hindi       | hi          | 1         | channel already exists with same channel code in your company |
            | 2         | marathi     | gu          | 1         | channel already exists with same channel name in your company |
