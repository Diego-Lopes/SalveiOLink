import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },

  details: {
    flex: 1,

  },
  name: {
    color: colors.gray[100],
    fontSize: 15,
    fontWeight: 'semibold',
  },
  url: {
    color: colors.gray[400],
    fontSize: 14,
  },

})