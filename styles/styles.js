import { StyleSheet } from "react-native";
// Note that the styles in this file
// are not being used in the ProfileScreen component
// as well as the LoginScreen component.
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
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
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  itemInList: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(230, 57, 70, 0.2)",
    padding: 10,
    marginVertical: 5,
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "rgba(230, 57, 70, 0.8)",
    width: "60%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 5,
  },
});
