<template>
  <section class="stats-section">
    <h2>Estadísticas Generales</h2>
    <div class="stats-cards">
      <div class="stat-card">
        <h3>Ventas Totales</h3>
        <p class="stat-value">${{ adminStats.totalSales.toFixed(2) }}</p>
      </div>
      <div class="stat-card">
        <h3>Clientes</h3>
        <p class="stat-value">{{ adminStats.crmData.customers }}</p>
      </div>
      <div class="stat-card">
        <h3>Interacciones CRM</h3>
        <p class="stat-value">{{ adminStats.crmData.interactions }}</p>
      </div>
      <div class="stat-card">
        <h3>Nivel de Stock</h3>
        <p class="stat-value">{{ adminStats.scmData.stockLevels }}</p>
      </div>
      <div class="stat-card">
        <h3>Proveedores</h3>
        <p class="stat-value">{{ adminStats.scmData.suppliers }}</p>
      </div>
      <div class="stat-card">
        <h3>Procesos ERP</h3>
        <p class="stat-value">{{ adminStats.erpData.processes }}</p>
      </div>
      <div class="stat-card">
        <h3>Eficiencia ERP</h3>
        <p class="stat-value">{{ adminStats.erpData.efficiency }}%</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { adminStats } from '../store.js';
</script>

<style scoped>
.stats-section {
  background-color: var(--surface-color);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background-color: var(--background-color);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-color);
}

@media (max-width: 768px) {
  .stats-cards {
    grid-template-columns: 1fr;
  }
}
</style>
