// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

contract TipJar {
    // evento que se emite cuando se envia la propina
    event NewTip(address indexed from, uint amount, string message);
    // evento que se emite al retirar el balance
    event Withdrawal(uint amount, uint when);

    struct TipData {
        address tipper; //Direccion de quien envio la propina
        string message; // mensaje de quien envia la propina
        uint256 timestamp; // datos de tiempo al momento de la transaccion
        uint256 amount; // monto de la propina
    }

    // Mapping para relacionar las direcciones con la información de las propinas
    mapping(address => TipData[]) public tipsData;

    // variable para almacenar la dirección del propietario del contrato
    address payable public owner;

    // Arrays de propinas
    TipData[] public tipHistory;

    //verifica que solo el owner pueda realizar la operación
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    // verifica que que el value no sea 0
    modifier approvedAmount() {
        require(msg.value > 0, "You cannot send 0 eth");
        _;
    }

    // verifica que que el address no sea 0
    modifier approvedAddress() {
        require(msg.sender != address(0), "cannot be de zero address");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    // funcion receive se le agrega la logica para que tambien pueda guardar los datos del tipper
    receive() external payable approvedAmount approvedAddress {
        _saveTip( msg.sender, msg.value,
            "transaction executed from the receive function" );
    }
    

    // funcion para ver el monto del balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // funcion tip ejecuta la funcion interna
    function tip( string memory _message ) public payable approvedAmount approvedAddress {
        _saveTip(msg.sender, msg.value, _message);
    }

    //funcion interna con la logica para poder utilzar en varias funciones
    function _saveTip( address _sender,uint256 _value,string memory _message ) internal {
        //creo un objeto para luego guardarlo en el array y para asignarlo a cada ddress
        TipData memory newTip = TipData({
            tipper: _sender,
            message: _message,
            timestamp: block.timestamp,
            amount: _value
        });

        //guardo cada objeto en el array
        tipHistory.push(newTip);
        //guardo el historial de cada propina que realice un mismo usuario
        tipsData[_sender].push(newTip);
        //emite el evento
        emit NewTip(_sender, _value, _message);
    }

    // funcion que permite al owner retirar el total de los fondos al momento de la transaccion
    function withdraw() public onlyOwner {
        uint256 totalBalance = address(this).balance;
        // tranfiere el balance total al owner
        (bool success, ) = owner.call{value: totalBalance}("");
        require(success, "Tranfer failed");
        //emite un evento cuando realiza la transaccion
        emit Withdrawal(totalBalance, block.timestamp);
    }
}
