import { StyleSheet } from 'react-native';

export const stylesAcess = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB', // Fundo padrão do SistemaPEE
  },

  main: {
    flex: 1,
    margin: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  // Cabeçalho da Tela
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F3',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
    fontWeight: '500',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#1D9E7510',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Lista de Logs
  listaContent: {
    paddingBottom: 20,
  },
  logCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F2F3',
  },
  iconArea: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logInfo: {
    flex: 1,
  },
  logHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  usuario: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8,
  },
  data: {
    fontSize: 11,
    color: '#8E8E93',
    fontWeight: '600',
  },

  // Badge de Ação
  acaoBadge: {
    backgroundColor: '#F1F3F4',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  acaoText: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
  },

  // Estados de Vazio e Loading
  vazioContainer: {
    alignItems: 'center',
    marginTop: 50,
    opacity: 0.5,
  },
  semRegistro: {
    textAlign: 'center',
    color: '#8E8E93',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },

  // Footer e Botão
  footer: {
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F3',
  },
  btnVoltar: {
    flexDirection: 'row',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#F8FAFB',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#666',
  },
});