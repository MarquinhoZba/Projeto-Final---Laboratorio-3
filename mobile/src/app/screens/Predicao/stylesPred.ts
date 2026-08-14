import { StyleSheet } from 'react-native';

/**
 * Retorna a configuração visual baseada no nível de risco de evasão.
 */
export const getRiscoConfig = (nivel: string) => {
  switch (nivel?.toLowerCase()) {
    case 'alto':
      return {
        label: 'RISCO ALTO',
        cor: '#D9534F',
        bg: 'rgba(217,83,79,0.12)',
      };
    case 'medio':
      return {
        label: 'RISCO MÉDIO',
        cor: '#F0AD4E',
        bg: 'rgba(240,173,78,0.12)',
      };
    default:
      return {
        label: 'RISCO BAIXO',
        cor: '#1D9E75',
        bg: 'rgba(29,158,117,0.12)',
      };
  }
};

/**
 * Extrai as iniciais do nome do aluno (Primeiro e Último nome).
 */
export const getIniciais = (nome: string) => {
  const partes = nome.trim().split(' ');
  if (partes.length === 1) return partes[0].charAt(0).toUpperCase();
  return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase();
};

/**
 * Gera uma cor de avatar consistente baseada no nome.
 */
export const getAvatarCor = (nome: string) => {
  const cores = ['#1D9E75', '#5B8DEF', '#9B59B6', '#F39C12', '#E74C3C', '#16A085'];
  const index = nome.length % cores.length;
  return cores[index];
};

export const stylesPred = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAF9', // Fundo levemente acinzentado para destacar os cards brancos
  },
  centralize: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  loadingText: {
    marginTop: 15,
    color: '#0F6E56',
    fontSize: 14,
    fontWeight: '600',
  },
  topbar: {
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F2D1F',
    letterSpacing: -0.5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#5A7D6C',
    marginTop: 4,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    // Sombra suave para iOS/Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1A2E25',
  },
  lista: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#8B9A91',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 15,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  formIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  formLabel: {
    fontSize: 12,
    color: '#8B9A91',
    fontWeight: '600',
  },
  formValor: {
    fontSize: 15,
    color: '#0F2D1F',
    fontWeight: '700',
    marginTop: 2,
  },
  divisor: {
    height: 1,
    backgroundColor: '#F0F4F2',
  },
  btnGerar: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1D9E75',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
  },
  btnGerarDesabilitado: {
    backgroundColor: '#A8C7BC',
    elevation: 0,
  },
  btnGerarText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 22,
    padding: 20,
    marginBottom: 18,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F4F2',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: '800',
    fontSize: 18,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
  },
  cardNome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F2D1F',
  },
  algoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  cardAlgo: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 5,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeText: {
    fontWeight: '800',
    fontSize: 10,
  },
  btnExcluir: {
    padding: 8,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: '#8B9A91',
    fontWeight: '600',
    marginBottom: 4,
  },
  statValor: {
    fontSize: 20,
    fontWeight: '800',
  },
  statSep: {
    width: 1,
    height: 35,
    backgroundColor: '#F0F4F2',
    marginHorizontal: 15,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
    paddingTop: 12,
  },
  dataTexto: {
    color: '#8B9A91',
    fontSize: 12,
    fontWeight: '500',
  },
  vazio: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  vazioText: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: '700',
    color: '#0F2D1F',
    textAlign: 'center',
  },
  vazioSub: {
    marginTop: 8,
    color: '#8B9A91',
    textAlign: 'center',
    lineHeight: 20,
  },
  modal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F2',
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2D1F',
  },
  modalFechar: {
    color: '#1D9E75',
    fontWeight: '700',
    fontSize: 15,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 15,
    marginVertical: 4,
    borderRadius: 12,
  },
  modalItemText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 15,
    color: '#0F2D1F',
    fontWeight: '600',
  }
});