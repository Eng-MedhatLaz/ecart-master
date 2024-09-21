import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BiSearch } from "react-icons/bi";
import SearchFilter from "react-filter-search";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import ProductCard from "../compantents/ProductCard";

const Home = () => {
  const [theme] = useThemeHook();
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState([]);
  async function getResponse() {
    const res = await fetch("https://fakestoreapi.com/products").then((res) =>
      res.json()
    );
    setProductData(await res);
  }
  useEffect(() => {
    getResponse();
  }, []);
  return (
    <div>
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col
            xs={10}
            md={7}
            lg={6}
            xl={4}
            className="mb-3 mx-auto text-center"
          >
            <h1 className={theme ? "text-light my-5" : "text-black my-5"}>
              Search products
            </h1>
            <InputGroup className="mb-3">
              <InputGroup.Text
                className={
                  theme
                    ? "bg-black text-dark-primary"
                    : "bg-light text-light-primary"
                }
              >
                {" "}
                <BiSearch size="2rem" />
              </InputGroup.Text>
              <Form.Control
                className={
                  theme ? "bg-light-black text-light" : "bg-light text-black"
                }
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </InputGroup>
          </Col>
          <SearchFilter
            value={searchInput}
            data={productData}
            renderResults={(results) => (
              <Row className="justify-content-center">
                {results.map((item, i) => (
                  <ProductCard data={item} key={i} />
                ))}
              </Row>
            )}
          />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
