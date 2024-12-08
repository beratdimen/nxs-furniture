"use client";

import {
  listAllProducts,
  listProductsAllCategories,
  listNewUserStats,
} from "@/api/category";
import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const AdminDashboard = () => {
  const [categoryChartData, setCategoryChartData] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [salesTrends, setSalesTrends] = useState([]);

  // Kategorilere göre analiz
  const fetchCategoryData = async () => {
    const response = await listProductsAllCategories();
    const categories = response.map((item) => ({
      name: item.name,
      count: item.productsCategories.length,
    }));
    setCategoryChartData(categories);
  };

  const fetchUserStats = async () => {
    const response = await listNewUserStats();
    const stats = response.map((user) => ({
      x: new Date(user.date).getTime(),
      y: user.count,
    }));
    setUserStats(stats);
  };

  const fetchSalesTrends = async () => {
    const response = await listAllProducts();
    const trendData = response.map((item) => ({
      x: new Date(item.created_at).getTime(),
      y: item.sales || 0,
    }));
    setSalesTrends(trendData);
  };

  useEffect(() => {
    fetchCategoryData();
    fetchUserStats();
    fetchSalesTrends();
  }, []);

  const categoryChartOptions = {
    chart: {
      type: "pie",
    },
    labels: categoryChartData.map((item) => item.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  const userStatsChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      type: "datetime",
      categories: userStats.map((item) => item.x),
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
      },
    },
  };

  const salesTrendsOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      type: "datetime",
      categories: salesTrends.map((item) => item.x),
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
  };

  return (
    <div
      className="container"
      style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
    >
      <header>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admin Dashboard Analytics
        </h1>
      </header>

      <div
        className="analytics-container"
        style={{ display: "flex", justifyContent: "space-around", gap: "20px" }}
      >
        <div
          style={{
            width: "45%",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            padding: "15px",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Ürün Kategorileri Dağılımı</h4>
          <ApexCharts
            options={categoryChartOptions}
            series={categoryChartData.map((item) => item.count)}
            type="pie"
            width={400}
          />
        </div>

        
        <div
          style={{
            width: "45%",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            padding: "15px",
          }}
        >
          <h4 style={{ textAlign: "center" }}>Yeni Kullanıcı Trendleri</h4>
          <ApexCharts
            options={userStatsChartOptions}
            series={[userStats.map((item) => item.y)]}
            type="line"
            width={400}
          />
        </div>
      </div>

      <div
        className="sales-trend-container"
        style={{ marginTop: "30px", textAlign: "center" }}
      >
        <div
          style={{
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            padding: "15px",
            display: "inline-block",
            width: "70%",
          }}
        >
          <h4 style={{ marginBottom: "10px" }}>Satış Trendleri</h4>
          <ApexCharts
            options={salesTrendsOptions}
            series={[salesTrends.map((item) => item.y)]}
            type="bar"
            width={600}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
