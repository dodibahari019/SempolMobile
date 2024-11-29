import React, { createContext, useState } from 'react';

export const VariableDash = createContext();

export const AppProvider = ({ children }) => {
      const [isVisible, setIsVisible] = useState('Beranda');
  const [activeButton, setActiveButton] = useState('Beranda');
  const [subMenu, setSubMenu] = useState('StockAwal');
  const [activeSubmenuButton, setActiveSubmenuButton] = useState('StockAwal');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleChartOne, setModalVisibleChartOne] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [date, setDate] = useState(new Date());  // State untuk menyimpan tanggal
  const [show, setShow] = useState(false);       // State untuk menampilkan DatePicker
  const [showStart, setShowStart] = useState(false); 
  const [showEnd, setShowEnd] = useState(false); 
  const [formattedDate, setFormattedDate] = useState(''); // State untuk menampilkan tanggal yang diformat
  const [formattedDateStart, setFormattedDateStart] = useState('');
  const [formattedDateEnd, setFormattedDateEnd] = useState('');
  const [dataDashboard, setDataDashboard] = useState([]);
  const [error, setError] = useState(null);
  //Date Time
  const [startDate, setStartDate] = useState(new Date()); // Tanggal awal
  const [endDate, setEndDate] = useState(new Date());     // Tanggal akhir
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  return (
    <VariableDash.Provider
      value={{
        userName,
        setUserName,
        userRole,
        setUserRole,
        appTheme,
        setAppTheme,
      }}
    >
      {children}
    </VariableDash.Provider>
  );
};
