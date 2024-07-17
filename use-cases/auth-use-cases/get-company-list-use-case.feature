Feature: Use Case To Get Company List

    Scenario Outline: It Should Successfully Get Company List
        Given email : '<email>' for get company list
        When try to get result for get company list
        Then it should return the result : '<result>' for get company list

        Examples:
            | email         | result                                                        |
            | oyo@gmail.com | [{"companyId":1,"companyName":"oyo","email":"oyo@gmail.com"}] |

    Scenario Outline: It Should Throw Error For Get Company List
        Given email : '<email>' for get company list
        When try to get result for get company list
        Then it should return the error : '<error>' for get company list

        Examples:
            | email         | error                              |
            |               | "email" is not allowed to be empty |
            | abc@          | "email" must be a valid email      |
            | tcs@gmail.com | company not exists                 |