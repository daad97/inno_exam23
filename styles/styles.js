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
  cancelButton: {
    backgroundColor: "rgba(230, 57, 70, 0.8)",
    width: "60%",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: "row",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
  },
});
