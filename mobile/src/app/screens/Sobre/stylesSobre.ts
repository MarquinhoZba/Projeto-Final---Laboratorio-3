import { StyleSheet } from 'react-native';

export const stylesSobre = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5EE', // Verde menta bem suave
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  // --- Elementos Decorativos (Blobs) ---
  blob: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.5,
  },

  blob1: {
    width: 320,
    height: 320,
    backgroundColor: '#9FE1CB',
    top: -100,
    left: -70,
  },

  blob2: {
    width: 280,
    height: 280,
    backgroundColor: '#CECBF6',
    bottom: -80,
    right: -50,
  },

  // --- Card Principal ---
  card: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)', // Leve transparência para ver os blobs ao fundo
    borderRadius: 32,
    padding: 30,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#0F2D1F',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },

  iconWrap: {
    width: 85,
    height: 85,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F2D1F',
    letterSpacing: -0.5,
  },

  badge: {
    backgroundColor: 'rgba(29, 158, 117, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 8,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D9E75',
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 15,
    color: '#5A7D6C',
    marginTop: 10,
    textAlign: 'center',
    fontWeight: '500',
  },

  divider: {
    width: '60%',
    height: 1.5,
    backgroundColor: '#E2EEE7',
    marginVertical: 25,
  },

  description: {
    textAlign: 'center',
    color: '#4B6B5D',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 10,
  },

  // --- Caixa de Informação do Dev ---
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#F3FAF7',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8F5EE',
  },

  infoIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  infoText: {
    marginLeft: 12,
    color: '#355846',
    fontSize: 14,
  },

  bold: {
    fontWeight: '800',
    color: '#0F2D1F',
  },

  // --- Botão GitHub ---
  button: {
    flexDirection: 'row',
    backgroundColor: '#1D9E75',
    marginTop: 28,
    paddingVertical: 15,
    paddingHorizontal: 28,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#1D9E75',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 15,
  },

  // --- Rodapé ---
  footerContainer: {
    marginTop: 30,
    alignItems: 'center',
  },

  footer: {
    color: '#8A9B93',
    fontSize: 12,
    fontWeight: '600',
  },

  footerSub: {
    color: '#A5B4AD',
    fontSize: 11,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});