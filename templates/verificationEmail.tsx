import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Link,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

const VerificationEmail = ({
  username,
  otp,
}: VerificationEmailProps) => (
  <Html>
    <Head />
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Heading style={styles.heading}>Verify Your Email</Heading>
        <Text style={styles.text}>Hi {username},</Text>
        <Text style={styles.text}>
          Thank you for signing up! To complete your registration, please verify
          your email by clicking the button below:
        </Text>
        <Button style={styles.button} href={otp}>
          Verify Email
        </Button>
        <Text style={styles.text}>
          Or you can copy and paste the following link into your browser:
        </Text>
        <Link style={styles.link} href={otp}>
          {otp}
        </Link>
        <Text style={styles.footerText}>
          If you did not request this, please ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerificationEmail;

// Define styles with CSSProperties type
const styles: { [key: string]: React.CSSProperties } = {
  body: {
    backgroundColor: "#f4f4f7",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  container: {
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "30px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    color: "#333333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "16px",
    color: "#666666",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  link: {
    color: "#007bff",
    wordBreak: "break-all",
  },
  footerText: {
    fontSize: "14px",
    color: "#999999",
    marginTop: "30px",
  },
};
