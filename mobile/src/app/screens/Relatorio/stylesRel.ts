import { StyleSheet } from 'react-native';

export const stylesRel = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  loadingText: {
    marginTop: 12,
    color: '#1D9E75',
    fontWeight: '600',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 15,
    backgroundColor: '#FFF',
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -0.5,
  },

  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },

  // --- Estilos de Busca e Filtro ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 16,
    height: 52,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 15,
    color: '#1F2937',
  },

  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 18,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
  },

  filterButtonActive: {
    backgroundColor: '#1D9E75',
  },

  filterText: {
    color: '#4B5563',
    fontSize: 13,
    fontWeight: '600',
  },

  filterTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },

  // --- Listagem e Cards de Aluno ---
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },

  nome: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
  },

  curso: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  badgeText: {
    fontWeight: '800',
    fontSize: 10,
  },

  gridInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  infoItem: {
    alignItems: 'flex-start',
  },

  infoLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
  },

  // --- Elementos de Rodapé do Card ---
  divisor: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 5,
  },

  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  situacaoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  situacaoText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },

  probContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  probLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  probValue: {
    fontSize: 14,
    fontWeight: '800',
  },

  // --- NOVOS ESTILOS: Centro de Exportação (PDF/Excel/Logs) ---
  cardExport: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  gradientIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  exportInfo: {
    flex: 1,
    marginLeft: 15,
  },

  exportTitleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },

  exportDesc: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFEEBA',
  },

  warningText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
  },

  // --- Botões de Ação Fixos ---
  buttonArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    elevation: 20,
  },

  exportTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    marginBottom: 12,
    textAlign: 'center',
    textTransform: 'uppercase',
  },

  exportActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  pdfBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  excelBtn: {
    flex: 1,
    backgroundColor: '#16A34A',
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
    marginLeft: 8,
  },
});