import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Place } from "../types/general";
import PlaceService from "../services/PlaceService";

type AddPlaceFormValues = { title: string; address: string };

const PlaceSchema = Yup.object({
  title: Yup.string().trim().min(2).max(80).required("Title is required"),
  address: Yup.string().trim().min(3).max(200).required("Address is required"),
});

const initialValues: AddPlaceFormValues = { title: "", address: "" };

function handleAddPlaceSubmit(
  values: AddPlaceFormValues,
  helpers: FormikHelpers<AddPlaceFormValues>
): Promise<void> {
  const newPlace: Place = {
    id: Date.now(),
    title: values.title.trim(),
    address: values.address.trim(),
    image: null,
    location: null,
  };

  return PlaceService.addPlace(newPlace)
    .then(() => helpers.resetForm())
    .finally(() => helpers.setSubmitting(false));
}

function AddPlacePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Place</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={PlaceSchema}
        onSubmit={handleAddPlaceSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <View>
            <TextInput
              placeholder="Title"
              value={values.title}
              onChangeText={handleChange("title")}
              onBlur={handleBlur("title")}
              style={[
                styles.input,
                touched.title && errors.title ? styles.inputError : null,
              ]}
            />
            {touched.title && errors.title ? (
              <Text style={styles.error}>{errors.title}</Text>
            ) : null}

            <TextInput
              placeholder="Address"
              value={values.address}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              style={[
                styles.input,
                touched.address && errors.address ? styles.inputError : null,
              ]}
            />
            {touched.address && errors.address ? (
              <Text style={styles.error}>{errors.address}</Text>
            ) : null}

            <Button
              title={isSubmitting ? "Saving..." : "Save Place"}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

export default AddPlacePage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  header: { fontSize: 22, fontWeight: "600", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
  },
  inputError: { borderColor: "#d00" },
  error: { color: "#d00", marginBottom: 8 },
});
