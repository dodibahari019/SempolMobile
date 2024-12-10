import React, { createContext, useState } from 'react';

export const VariableDash = createContext();

export const AppProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState('Beranda');
  const [activeButton, setActiveButton] = useState('Beranda');
  const [typeButton, setTypeButton] = useState('Pemasukan');
  const [subMenu, setSubMenu] = useState('StockAwal');
  const [activeSubmenuButton, setActiveSubmenuButton] = useState('StockAwal');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleChartOne, setModalVisibleChartOne] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState(new Date()); // State untuk menyimpan tanggal
  const [show, setShow] = useState(false); // State untuk menampilkan DatePicker
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [formattedDate, setFormattedDate] = useState(''); // State untuk menampilkan tanggal yang diformat
  const [formattedDateStart, setFormattedDateStart] = useState('');
  const [formattedDateEnd, setFormattedDateEnd] = useState('');
  const [dataDashboard, setDataDashboard] = useState([]);
  const [error, setError] = useState(null);
  // Date Time
  const [startDate, setStartDate] = useState(new Date()); // Tanggal awal
  const [endDate, setEndDate] = useState(new Date()); // Tanggal akhir
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  return (
    <VariableDash.Provider
      value={{
        isVisible,
        setIsVisible,
        activeButton,
        setActiveButton,
        typeButton, s
        etTypeButton,
        subMenu,
        setSubMenu,
        activeSubmenuButton,
        setActiveSubmenuButton,
        isModalVisible,
        setModalVisible,
        isModalVisibleChartOne,
        setModalVisibleChartOne,
        currentDate,
        setCurrentDate,
        date,
        setDate,
        show,
        setShow,
        showStart,
        setShowStart,
        showEnd,
        setShowEnd,
        formattedDate,
        setFormattedDate,
        formattedDateStart,
        setFormattedDateStart,
        formattedDateEnd,
        setFormattedDateEnd,
        dataDashboard,
        setDataDashboard,
        error,
        setError,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        showStartDatePicker,
        setShowStartDatePicker,
        showEndDatePicker,
        setShowEndDatePicker,
      }}
    >
      {children}
    </VariableDash.Provider>
  );
};
