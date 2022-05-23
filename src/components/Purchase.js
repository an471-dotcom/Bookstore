import {Button, Modal, Input} from 'antd'
import {ShoppingCartOutlined} from "@ant-design/icons";
import {useState} from 'react';
import {useMoralis} from 'react-moralis'

const {TextArea} = Input;

const Purchase =({book})=>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [delivery, setDelivery] = useState("");
    const {Moralis,account,chainId} = useMoralis();
    const handleOk = async ()=>{
        const options = {
            address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
            chain: "eth",
          };
          const price = await Moralis.Web3API.token.getTokenPrice(options);
          const priceMatic = book.price / price.usdPrice;
          const options1 = {
            type: "native",
            amount: Moralis.Units.ETH(priceMatic),
            receiver: "0xc45dDff7CEf6cFC68f348d1Ac16Be39FBA0A33F4",
          };
          let result = await Moralis.transfer(options1);
          console.log(result)
          const Transcation = Moralis.Object.extend("Transaction");
          const transaction = new Transcation();

          transaction.set("Customer", account);
          transaction.set("Delivary", delivery);
          transaction.set("Product", book.name);

          transaction.save()
          console.log(price)
        setIsModalVisible(false)
    }
    return(
        <>
        <span className="price"> ₹{book.inr}</span>
        <p>No Import Fees & Free Shipping Included</p>
        <h1 style={{ color: "green" }}> In Stock </h1>
        {/* <h3>Quantity</h3>
        <Select defaultValue={1} style={{ width: "100%" }}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
          <Option value={4}>4</Option>
          <Option value={5}>5</Option>
        </Select> */}
      {chainId==="0x13881" &&
      <Button
      className="login"
      style={{ width: "100%", marginTop: "50px" }}
      onClick={()=>setIsModalVisible(true)}>
      <ShoppingCartOutlined /> Buy Now
    </Button>
    }
    <Modal
        title="Purchase Product"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={()=>setIsModalVisible(false)}
      >
           <div style={{ display: "flex", gap:"20px" }}>
          <img src={book.image} alt="product" style={{ width: "200px" }}></img>
          <div>
            <h3>{book.name}</h3>
            <h2>₹{book.inr}</h2>
            <h4>Delivery Address</h4>
            <TextArea onChange={(value) => setDelivery(value.target.value)}></TextArea>
          </div>
        </div>
      </Modal>
        </>
    )
}

export default Purchase