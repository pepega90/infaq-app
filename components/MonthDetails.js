import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Button, FAB } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Swipeable } from "react-native-gesture-handler";
import {
  getListWargaByBulanId,
  insertWarga,
  updateWarga,
  deleteWarga,
} from "../data/database/operation";

const screenHeight = Dimensions.get("screen").height;

const MonthDetails = ({ month }) => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nominal, setNominal] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());
  const [showFilterDatePicker, setShowFilterDatePicker] = useState(false);
  const [errors, setErrors] = useState({
    nama: "",
    alamat: "",
    nominal: "",
    date: "",
  });
  const swipeableRefs = useRef({});

  useEffect(() => {
    const getWargaBulan = async () => {
      try {
        const data = await getListWargaByBulanId(month.id);
        setData(data);
      } catch (err) {
        console.error(`error get data warga by bulan id = ${month.id}`, err);
      }
    };
    getWargaBulan();
  }, []);

  const formatDateString = (date) => moment(date).format("YYYY-MM-DD");

  const filteredData = filterDate
    ? data.filter((item) => item.tgl === formatDateString(filterDate))
    : data;

  const totalInfaq = filteredData.reduce(
    (sum, entry) => sum + entry.nominal,
    0
  );

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      nama: "",
      alamat: "",
      nominal: "",
      date: "",
    };

    if (!nama.trim()) {
      newErrors.nama = "Nama harus diisi";
      valid = false;
    }

    if (!alamat.trim()) {
      newErrors.alamat = "Alamat harus diisi";
      valid = false;
    }

    if (!nominal) {
      newErrors.nominal = "Nominal harus diisi";
      valid = false;
    } else if (isNaN(nominal) || parseInt(nominal) <= 0) {
      newErrors.nominal = "Nominal harus lebih dari 0";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const formatNominal = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    if (numericValue) {
      return parseInt(numericValue).toLocaleString("id-ID");
    }
    return "";
  };

  const handleNominalChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setNominal(numericValue);
    if (errors.nominal) setErrors({ ...errors, nominal: "" });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleFilterDateChange = (event, selectedDate) => {
    setShowFilterDatePicker(false);
    if (selectedDate) {
      setFilterDate(selectedDate);
    }
  };

  const handleAddInfaq = async () => {
    if (validateForm()) {
      const newEntry = {
        nama: nama.trim(),
        alamat: alamat.trim(),
        nominal: parseInt(nominal),
        date: formatDateString(date),
        id_bulan: month.id,
      };
      try {
        await insertWarga(month.id, newEntry);
        const data = await getListWargaByBulanId(month.id);
        setData(data);
      } catch (err) {
        console.error(`error insert data warga `, err);
      }
      resetForm();
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNama(item.nama);
    setAlamat(item.alamat);
    setNominal(item.nominal.toString());
    setDate(new Date(item.tgl));
    setModalVisible(true);
  };

  const handleUpdateInfaq = async () => {
    if (validateForm()) {
      const updatedEntry = {
        id: editingItem.id,
        nama: nama.trim(),
        alamat: alamat.trim(),
        nominal: parseInt(nominal),
        date: formatDateString(date),
      };

      try {
        await updateWarga(updatedEntry);
        const data = await getListWargaByBulanId(month.id);
        setData(data);
        resetForm();
      } catch (err) {
        console.error(`error updating data warga`, err);
      }
    }
  };

  const resetForm = () => {
    setNama("");
    setAlamat("");
    setNominal("");
    setDate(new Date());
    setModalVisible(false);
    setEditingItem(null);
    setErrors({ nama: "", alamat: "", nominal: "", date: "" });
  };

  const clearFilter = () => {
    setFilterDate(null);
  };

  const handleDelete = async (id) => {
    Alert.alert("Konfirmasi", "Apakah anda yakin ingin menghapus data ini?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        onPress: async () => {
          try {
            await deleteWarga(id);
            setData(data.filter((item) => item.id !== id));
            if (swipeableRefs.current[id]) {
              swipeableRefs.current[id].close();
            }
          } catch (err) {
            console.error("Error deleting warga", err);
          }
        },
      },
    ]);
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1],
    });

    return (
      <Animated.View
        style={[
          styles.deleteContainer,
          {
            transform: [{ translateX: trans }],
          },
        ]}
      >
        <Text onPress={() => handleDelete(item.id)}>
          <Icon name="delete" size={24} color="white" />
        </Text>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#f8f9fa",
        padding: 8,
        height: screenHeight * 0.8,
      }}
    >
      {/* Header Section */}
      <View style={globalStyles.colorfulCard}>
        <Text style={globalStyles.header}>Detail Bulan: {month.bulan}</Text>
        <Text style={globalStyles.totalText}>
          Total Infaq: Rp {totalInfaq.toLocaleString("id-ID")}
        </Text>

        {/* Date Filter Section */}
        <View style={styles.filterContainer}>
          <Text style={styles.filterLabel}>Filter Tanggal:</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowFilterDatePicker(true)}
          >
            <Text>
              {filterDate
                ? moment(filterDate).format("DD/MM/YYYY")
                : "Pilih Tanggal"}
            </Text>
          </TouchableOpacity>
          {filterDate && (
            <Button
              mode="text"
              onPress={clearFilter}
              style={styles.clearFilterButton}
            >
              Clear
            </Button>
          )}
          {showFilterDatePicker && (
            <DateTimePicker
              value={filterDate || new Date()}
              mode="date"
              display="default"
              onChange={handleFilterDateChange}
            />
          )}
        </View>
      </View>

      {/* Table Section */}
      <View style={globalStyles.card}>
        <Text style={globalStyles.colorfulSectionTitle}>
          {filterDate
            ? `Daftar Infaq - ${moment(filterDate).format("DD/MM/YYYY")}`
            : "Daftar Infaq"}
        </Text>
        <ScrollView style={{ height: screenHeight * 0.5 }}>
          {filteredData.length > 0 ? (
            <>
              <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, styles.noHeader]}>
                  No
                </Text>
                <Text style={styles.tableHeaderText}>Nama</Text>
                <Text style={styles.tableHeaderText}>Tanggal</Text>
                <Text style={styles.tableHeaderText}>Alamat</Text>
                <Text style={styles.tableHeaderText}>Nominal</Text>
                <Text style={styles.tableHeaderText}>Aksi</Text>
              </View>
              {filteredData.map((entry, index) => (
                <Swipeable
                  key={entry.id}
                  ref={(ref) => (swipeableRefs.current[entry.id] = ref)}
                  renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, entry)
                  }
                  rightThreshold={40}
                  friction={2}
                >
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.noColumn]}>
                      {index + 1}
                    </Text>
                    <Text style={styles.tableCell}>{entry.nama}</Text>
                    <Text style={styles.tableCell}>
                      {moment(entry.tgl).format("DD/MM/YY")}
                    </Text>
                    <Text style={styles.tableCell}>{entry.alamat}</Text>
                    <Text style={styles.tableCell}>
                      Rp {entry.nominal.toLocaleString("id-ID")}
                    </Text>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEdit(entry)}
                    >
                      <Icon name="edit" size={20} color="#3498db" />
                    </TouchableOpacity>
                  </View>
                </Swipeable>
              ))}
            </>
          ) : (
            <View style={styles.emptyDataContainer}>
              <Icon name="info-outline" size={40} color="#888" />
              <Text style={styles.emptyDataText}>Data belum ada</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        color="#fff"
        onPress={() => setModalVisible(true)}
      />

      {/* Modal for Adding/Editing Infaq */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingItem ? "Edit Data Infaq" : "Tambah Data Infaq"}
            </Text>
            <TextInput
              style={[styles.input, errors.nama && styles.inputError]}
              placeholder="Nama"
              value={nama}
              onChangeText={(text) => {
                setNama(text);
                if (errors.nama) setErrors({ ...errors, nama: "" });
              }}
            />
            {errors.nama && <Text style={styles.errorText}>{errors.nama}</Text>}

            <TextInput
              style={[styles.input, errors.alamat && styles.inputError]}
              placeholder="Alamat"
              value={alamat}
              onChangeText={(text) => {
                setAlamat(text);
                if (errors.alamat) setErrors({ ...errors, alamat: "" });
              }}
            />
            {errors.alamat && (
              <Text style={styles.errorText}>{errors.alamat}</Text>
            )}

            <TextInput
              style={[styles.input, errors.nominal && styles.inputError]}
              placeholder="Nominal"
              value={formatNominal(nominal)}
              onChangeText={handleNominalChange}
              keyboardType="numeric"
            />
            {errors.nominal && (
              <Text style={styles.errorText}>{errors.nominal}</Text>
            )}

            <TouchableOpacity
              style={[styles.input, styles.dateInput]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text>{moment(date).format("DD/MM/YYYY")}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Button
              style={{ marginBottom: 8 }}
              mode="contained"
              onPress={editingItem ? handleUpdateInfaq : handleAddInfaq}
            >
              {editingItem ? "Update" : "Tambah"}
            </Button>
            <Button mode="outlined" onPress={resetForm}>
              Batal
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#f0f4ff",
    borderRadius: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 2,
  },
  noHeader: {
    flex: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
    backgroundColor: "white",
  },
  tableCell: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 2,
  },
  noColumn: {
    flex: 0.5,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#6200ee",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  dateInput: {
    marginVertical: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginVertical: 3,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  filterLabel: {
    marginRight: 10,
  },
  clearFilterButton: {
    marginLeft: 10,
  },
  editButton: {
    padding: 5,
    flex: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteContainer: {
    width: 80,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 8,
    marginLeft: 5,
  },
  emptyDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    height: screenHeight * 0.4, // Adjust as needed
  },
  emptyDataText: {
    fontSize: 16,
    color: "#888",
    marginTop: 10,
    textAlign: "center",
  },
});

export default MonthDetails;
