//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    uint256 data;

    mapping(string => uint256) public nameToNumber;
    // People public  person1 = People({
    //     id:10,
    //     name:"abdulsaboor"
    // });

    struct People {
        uint256 id;
        string name;
    }

    People[] public people;

    function store(uint256 numberToUpdate) public virtual {
        data = numberToUpdate;
    }

    function retreive() public view returns (uint256) {
        return data;
    }

    function addPeople(uint256 _id, string memory _name) public {
        // People memory newPerson = People({id:_id, name:_name});
        // People memory newPerson = People(_id,_name);
        people.push(People(_id, _name));
        nameToNumber[_name] = _id;
    }
}
