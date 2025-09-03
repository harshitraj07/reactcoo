// Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import styles from './Home.module.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    tension?: number;
    fill?: boolean;
  }[];
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <div className={`${styles.metricCard} ${isPositive ? styles.positive : styles.negative}`}>
      <div className={styles.metricIcon}>{icon}</div>
      <div className={styles.metricContent}>
        <h3>{title}</h3>
        <div className={styles.metricValue}>{value}</div>
        <div className={styles.metricChange}>
          <span>{isPositive ? '↑' : '↓'} {Math.abs(change)}%</span>
          <span>{isPositive ? 'Increase' : 'Decrease'} from last month</span>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  // const [activeTab, setActiveTab] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Revenue ($)',
            data: [12000, 19000, 15000, 20000, 18000, 24000],
            backgroundColor: 'rgba(101, 116, 205, 0.2)',
            borderColor: 'rgba(101, 116, 205, 1)',
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Users',
            data: [800, 1200, 1000, 1500, 1300, 2000],
            backgroundColor: 'rgba(80, 200, 180, 0.2)',
            borderColor: 'rgba(80, 200, 180, 1)',
            tension: 0.4,
          }
        ]
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(45, 55, 72, 0.95)',
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || '';
            if (context.parsed.y !== null) {
              if (label.includes('$')) {
                label += ': ' + new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(context.parsed.y);
              } else {
                label += ': ' + context.parsed.y;
              }
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawOnChartArea: true,
          color: 'rgba(226, 232, 240, 0.5)'
        },
        ticks: {
          callback: (value: any) => {
            if (typeof value === 'number') {
              return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(value);
            }
            return value;
          }
        }
      },
      x: {
        grid: {
          drawOnChartArea: false,
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.dashboardMain}>
        <div className={styles.metricsGrid}>
          <MetricCard 
            title="Total Revenue" 
            value="$24,780" 
            change={12.5} 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            } 
          />
          <MetricCard 
            title="Active Users" 
            value="1,950" 
            change={8.2} 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            } 
          />
          <MetricCard 
            title="Conversion Rate" 
            value="3.6%" 
            change={-2.1} 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                <polyline points="16 7 22 7 22 13"></polyline>
              </svg>
            } 
          />
          <MetricCard 
            title="Avg. Order Value" 
            value="$89.34" 
            change={4.7} 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            } 
          />
        </div>

        <div className={styles.chartContainer}>
          <div className={styles.chartHeader}>
            <h2>Performance Overview</h2>
            <div className={styles.chartFilters}>
              <select className={styles.filterSelect}>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Last year</option>
              </select>
            </div>
          </div>
          <div className={styles.chartWrapper}>
            {isLoading ? (
              <div className={styles.chartSkeleton}></div>
            ) : (
              <Line 
                data={chartData} 
                options={chartOptions} 
                className={styles.chartCanvas}
              />
            )}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.recentActivity}>
            <h2>Recent Activity</h2>
            <ul>
              {[
                { id: 1, user: 'Alex Morgan', action: 'placed an order', time: '2 min ago' },
                { id: 2, user: 'Jamie Smith', action: 'subscribed to newsletter', time: '10 min ago' },
                { id: 3, user: 'Taylor Johnson', action: 'made a payment', time: '25 min ago' },
                { id: 4, user: 'Casey Williams', action: 'requested a refund', time: '1 hour ago' },
                { id: 5, user: 'Jordan Davis', action: 'wrote a review', time: '2 hours ago' },
              ].map((activity) => (
                <li key={activity.id} className={styles.activityItem}>
                  <div className={styles.activityAvatar}>
                    {activity.user.charAt(0)}
                  </div>
                  <div className={styles.activityContent}>
                    <p><strong>{activity.user}</strong> {activity.action}</p>
                    <small>{activity.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.quickStats}>
            <h2>Quick Stats</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <span>Pending Orders</span>
                <strong>24</strong>
              </div>
              <div className={styles.statItem}>
                <span>Completed Today</span>
                <strong>56</strong>
              </div>
              <div className={styles.statItem}>
                <span>New Customers</span>
                <strong>12</strong>
              </div>
              <div className={styles.statItem}>
                <span>Support Tickets</span>
                <strong>5</strong>
              </div>
            </div>
            <div className={styles.progressContainer}>
              <h3>Monthly Goal</h3>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '65%' }}></div>
              </div>
              <div className={styles.progressInfo}>
                <span>65% completed</span>
                <span>$16,250 of $25,000</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;