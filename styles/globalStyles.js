import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa", // Light gray background
    padding: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    color: "#333",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  amountText: {
    fontSize: 16,
    color: "#333",
  },
  incomeText: {
    color: "#4CAF50", // Green for income
  },
  expenseText: {
    color: "#F44336", // Red for expenses
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#6200ee", // Purple accent
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  // New colorful additions
  colorfulHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ee", // Purple accent
    marginBottom: 16,
  },
  colorfulSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6200ee", // Purple accent
    marginBottom: 12,
  },
  colorfulCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 6,
    borderLeftColor: "#6200ee", // Purple accent border
  },
  colorfulListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f0f4ff", // Light purple background
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  colorfulListItemText: {
    fontSize: 16,
    color: "#333",
  },
});
