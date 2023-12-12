import { StyleSheet } from "react-native";
// Note that the styles in this file
// are not being used in the ProfileScreen component
// as well as the LoginScreen component.
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
  cancelButton: {
    backgroundColor: "#E63946",
    width: "60%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 5,
  },
});
