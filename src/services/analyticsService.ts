import ReactGA from 'react-ga4';

class AnalyticsService {
  private initialized: boolean = false;
  private measurementId: string;
  private isDebugMode: boolean;
  private isProduction: boolean;

  constructor(measurementId: string) {
    this.measurementId = measurementId;
    this.isDebugMode = localStorage.getItem('ga_debug') === 'true';
    this.isProduction = import.meta.env.PROD || window.location.hostname !== 'localhost';
  }

  /**
   * Inicializa o Google Analytics
   */
  initialize(): void {
    if (!this.initialized) {
      ReactGA.initialize(this.measurementId, {
        gaOptions: {
          cookieFlags: 'SameSite=None;Secure',
        },
        testMode: !this.isProduction
      });
      this.initialized = true;
      
      if (this.isDebugMode || !this.isProduction) {
        console.log('Google Analytics inicializado em modo de teste');
      }
    }
  }

  /**
   * Registra uma visualização de página
   * @param pagePath - O caminho da página (ex: '/home', '/produtos')
   * @param pageTitle - O título da página
   */
  pageview(pagePath: string, pageTitle?: string): void {
    if (!this.initialized) {
      console.warn('Google Analytics não foi inicializado. Chamando initialize()...');
      this.initialize();
    }

    ReactGA.send({ hitType: 'pageview', page: pagePath, title: pageTitle });
  }

  /**
   * Registra um evento personalizado
   * @param category - Categoria do evento
   * @param action - Ação realizada
   * @param label - Rótulo opcional para o evento
   * @param value - Valor numérico opcional associado ao evento
   */
  event(category: string, action: string, label?: string, value?: number): void {
    if (!this.initialized) {
      console.warn('Google Analytics não foi inicializado. Chamando initialize()...');
      this.initialize();
    }

    ReactGA.event({
      category,
      action,
      label,
      value
    });
  }
  /**
   * Define um usuário para rastreamento
   * @param userId - ID único do usuário
   */
  setUser(userId: string): void {
    if (!this.initialized) {
      console.warn('Google Analytics não foi inicializado. Chamando initialize()...');
      this.initialize();
    }

    ReactGA.set({ userId });
  }

  /**
   * Rastreia o tempo que uma operação leva para ser concluída
   * @param category - Categoria do evento de timing
   * @param variable - O nome da variável de timing
   * @param time - O tempo em milissegundos
   * @param label - Rótulo opcional
   */
  timing(category: string, variable: string, time: number, label?: string): void {
    if (!this.initialized) {
      this.initialize();
    }

    ReactGA.send({
      hitType: 'timing',
      timingCategory: category,
      timingVar: variable,
      timingValue: time,
      timingLabel: label
    });
  }

  /**
   * Rastreia uma visualização de produto
   * @param product - O produto visualizado
   */
  viewProduct(product: {
    id: string;
    name: string;
    category?: string;
    price?: number;
    brand?: string;
  }): void {
    if (!this.initialized) {
      this.initialize();
    }

    ReactGA.gtag('event', 'view_item', {
      currency: 'BRL',
      value: product.price || 0,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || '',
          item_brand: product.brand || '',
          price: product.price || 0
        }
      ]
    });
  }

  /**
   * Rastreia a adição de um produto ao carrinho
   */
  addToCart(product: {
    id: string;
    name: string;
    price?: number;
    quantity?: number;
    category?: string;
  }): void {
    if (!this.initialized) {
      this.initialize();
    }

    ReactGA.gtag('event', 'add_to_cart', {
      currency: 'BRL',
      value: (product.price || 0) * (product.quantity || 1),
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category || '',
          price: product.price || 0,
          quantity: product.quantity || 1
        }
      ]
    });
  }

  /**
   * Rastreia uma compra concluída
   */
  purchase(transaction: {
    id: string;
    revenue: number;
    tax?: number;
    shipping?: number;
    items: Array<{
      id: string;
      name: string;
      price?: number;
      quantity?: number;
      category?: string;
    }>;
  }): void {
    if (!this.initialized) {
      this.initialize();
    }

    ReactGA.gtag('event', 'purchase', {
      transaction_id: transaction.id,
      value: transaction.revenue,
      tax: transaction.tax || 0,
      shipping: transaction.shipping || 0,
      currency: 'BRL',
      items: transaction.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category || '',
        price: item.price || 0,
        quantity: item.quantity || 1
      }))
    });
  }
}

// Exporta uma instância única com seu Measurement ID
const analyticsService = new AnalyticsService('G-TH5T461VFJ');

export default analyticsService;
