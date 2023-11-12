import React from 'react'
import {
    Container,
    Card,
    Box,
    Heading,
    Text,
    Spinner,
  } from 'tailwindcss/react';
export const Nososotros = () => {
  return (
    <Container>
    <Card>
      <Box
        rounded="lg"
        shadow="md"
        max-w="md"
        mx="auto"
        p="6"
      >
        <Heading as="h2" mb="4">
          Sobre nosotros
        </Heading>
        <Text>
          Somos un equipo de desarrolladores que hemos creado una web para hacer reservas de pistas de deportes.
          Nuestra misión es facilitar a las personas la reserva de pistas de deportes de forma rápida y sencilla.
        </Text>
        <Text>
          Nuestra web está disponible en todo el mundo y ofrece una amplia variedad de pistas de deportes,
          incluyendo pistas de tenis, pádel, baloncesto, fútbol, etc.
        </Text>
        <Text>
          Para realizar una reserva, solo tienes que seleccionar la pista que deseas reservar, la fecha y la hora.
          Recibirás un correo electrónico de confirmación con los detalles de tu reserva.
        </Text>
      </Box>
    </Card>
  </Container>
  )
}
