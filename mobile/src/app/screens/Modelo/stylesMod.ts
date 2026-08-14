import { StyleSheet } from 'react-native';

export const stylesMod = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB', // Fundo padrão institucional
  },

  // Elementos orgânicos (Blobs)
  blob: {
    position: 'absolute',
    borderRadius: 300,
    opacity: 0.15,
  },
  blob1: {
    width: 250,
    height: 250,
    backgroundColor: '#1D9E75',
    top: -80,
    left: -90,
  },
  blob2: {
    width: 200,
    height: 200,
    backgroundColor: '#CECBF6',
    bottom: -50,
    right: -60,
  },

  // Cabeçalho da Tela
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    paddingHorizontal: 20,
    marginBottom: 20,
    fontWeight: '500',
  },

  // Texto de Introdução da Lista
  introText: {
    fontSize: 13,
    color: '#666',
    marginHorizontal: 20,
    marginBottom: 15,
    fontStyle: 'italic',
  },

  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Estilização do Card de Modelo
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F2F3',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 14,
    flex: 1,
  },
  algoritmo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  id: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  // Área de Métricas (Acurácia e Data)
  infoArea: {
    gap: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFB',
    padding: 10,
    borderRadius: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1D9E7515',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: {
    color: '#1D9E75',
    fontWeight: '800',
    fontSize: 13,
  },
  dataText: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '500',
  },

  descricao: {
    fontSize: 14,
    color: '#4A4A4A',
    lineHeight: 22,
  },

  // Estados
  loadingArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#1D9E75',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    opacity: 0.4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    marginTop: 10,
  },

  fab: {
  position: 'absolute',
  bottom: 30,
  right: 25,
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},
fabGradient: {
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
},

});