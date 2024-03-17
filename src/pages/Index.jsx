import React, { useState } from "react";
import { Box, Heading, Text, VStack, Grid, Image, Button, useNumberInput, HStack, Divider, useToast, Input } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

const MenuCard = ({ title, imageUrl, price, onAddToCart }) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Image src={imageUrl} alt={title} borderRadius="md" />
        <Heading size="md">{title}</Heading>
        <Text fontWeight="bold">${price.toFixed(2)}</Text>
        <HStack maxW="320px">
          <Button {...dec}>-</Button>
          <Input {...input} />
          <Button {...inc}>+</Button>
        </HStack>
        <Button colorScheme="blue" onClick={() => onAddToCart(title, price, input.value)}>
          Add to Cart
        </Button>
      </VStack>
    </Box>
  );
};

const Index = () => {
  const [cart, setCart] = useState([]);
  const toast = useToast();

  const addToCart = (title, price, quantity) => {
    setCart([...cart, { title, price, quantity }]);
    toast({
      title: "Added to cart",
      description: `${quantity}x ${title} added to cart.`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box>
      <Heading as="h1" size="2xl" textAlign="center" m={8}>
        Seafood, Burgers, Pizzas & More
      </Heading>
      <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={8} m={8}>
        <MenuCard title="Seafood Boil" imageUrl="https://images.unsplash.com/photo-1655992829046-ae2d44d205f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwYm9pbHxlbnwwfHx8fDE3MTA3MDQ2NDd8MA&ixlib=rb-4.0.3&q=80&w=1080" price={24.99} onAddToCart={addToCart} />
        <MenuCard title="Cheeseburger" imageUrl="https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjaGVlc2VidXJnZXJ8ZW58MHx8fHwxNzEwNzA0NjQ4fDA&ixlib=rb-4.0.3&q=80&w=1080" price={8.99} onAddToCart={addToCart} />
        <MenuCard title="Pepperoni Pizza" imageUrl="https://images.unsplash.com/photo-1628840042765-356cda07504e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YXxlbnwwfHx8fDE3MTA3MDQ2NDh8MA&ixlib=rb-4.0.3&q=80&w=1080" price={12.99} onAddToCart={addToCart} />
        <MenuCard title="Raising Cane's Combo" imageUrl="https://images.unsplash.com/photo-1471623817296-aa07ae5c9f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxyYWlzaW5nJTIwY2FuZXMlMjBjaGlja2VuJTIwZmluZ2Vyc3xlbnwwfHx8fDE3MTA3MDQ2NDh8MA&ixlib=rb-4.0.3&q=80&w=1080" price={10.99} onAddToCart={addToCart} />
        <MenuCard title="Lemonade" imageUrl="https://images.unsplash.com/photo-1527271982979-83fea3eb3582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxsZW1vbmFkZSUyMGRyaW5rfGVufDB8fHx8MTcxMDcwNDY0OXww&ixlib=rb-4.0.3&q=80&w=1080" price={2.99} onAddToCart={addToCart} />
        <MenuCard title="Iced Tea" imageUrl="https://images.unsplash.com/photo-1496318447583-f524534e9ce1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxpY2VkJTIwdGVhJTIwZHJpbmt8ZW58MHx8fHwxNzEwNzA0NjQ5fDA&ixlib=rb-4.0.3&q=80&w=1080" price={2.49} onAddToCart={addToCart} />
      </Grid>
      <Divider />
      <VStack spacing={4} align="stretch" m={8}>
        <Heading as="h2" size="xl">
          Cart
        </Heading>
        {cart.map((item, index) => (
          <HStack key={index} justify="space-between">
            <Text>
              {item.quantity}x {item.title}
            </Text>
            <Text fontWeight="bold">${(item.price * item.quantity).toFixed(2)}</Text>
          </HStack>
        ))}
        <Text fontSize="lg" fontWeight="bold">
          Total: ${total.toFixed(2)}
        </Text>
        <Button colorScheme="green" size="lg" rightIcon={<FaShoppingCart />} isDisabled={cart.length === 0}>
          Checkout
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
