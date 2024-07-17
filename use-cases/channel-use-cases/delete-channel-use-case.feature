Feature: Use Case To Delete Channel

    Scenario Outline: It Should Successfully Delete Channel
        Given channelId : '<channelId>',companyId : '<companyId>' for delete channel
        When try to get result for delete channel
        Then it should return the result : '<result>' for delete channel

        Examples:
            | channelId | companyId | result                                                                   |
            | 2         | 1         | {"channelId":2,"channelName":"hindi","channelCode":"hi","companyId":1} |

Scenario Outline: It Should Throw Error For Delete Channel
    Given channelId : '<channelId>',companyId : '<companyId>' for delete channel
    When try to get result for delete channel
    Then it should return the error : '<error>' for delete channel

            Examples:
            | channelId | companyId | error                                                                   |
            | 1         | 1         | dont allow to delete english channel |
            | 3         | 1         | channel dont exists |

