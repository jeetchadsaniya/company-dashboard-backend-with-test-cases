Feature: Use Case To Get Channel

    Scenario Outline: It Should Successfully Get Channel
        Given channelId : '<channelId>',companyId : '<companyId>' for get channel
        When try to get result for get channel
        Then it should return the result : '<result>' for get channel

        Examples:
            | channelId | companyId | result                                                                   |
            | 1         | 1         | {"channelId":1,"channelName":"english","channelCode":"en","companyId":1} |

Scenario Outline: It Should Throw Error For Get Channel
    Given channelId : '<channelId>',companyId : '<companyId>' for get channel
    When try to get result for get channel
    Then it should return the error : '<error>' for get channel

            Examples:
            | channelId | companyId | error                                                                   |
            | 2         | 1         | channel dont exists |

