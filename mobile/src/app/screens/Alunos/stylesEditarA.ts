import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const stylesEditarA = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#f0f7f4' },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#f0f7f4',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
  },
  loadingText: { fontSize: 14, color: '#5A7D6C', fontWeight: '500' },

  // ── Header ───────────────────────────────────────────────────────────────

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5ee',
  },
  headerBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#e1f5ee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F2D1F',
    letterSpacing: -0.3,
  },

  scroll: { padding: 18, paddingBottom: 40 },

  // ── Form Header ──────────────────────────────────────────────────────────

  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 22,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#1D9E75',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formHeaderTitle: { fontSize: 16, fontWeight: '700', color: '#0F2D1F' },
  formHeaderSub: { fontSize: 12, color: '#5A7D6C', marginTop: 2 },

  // ── Section Title ────────────────────────────────────────────────────────

  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#C0DCC8',
  },
  sectionTitleText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F6E56',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // ── Campo / Input ─────────────────────────────────────────────────────────

  campo: { marginBottom: 12 },
  label: { fontSize: 13, fontWeight: '600', color: '#0F2D1F', marginBottom: 6 },

  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0DCC8',
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 10,
  },
  fieldIcon: { width: 16, textAlign: 'center' },
  input: { flex: 1, fontSize: 14, color: '#0F2D1F', paddingVertical: 0 },
  selectText: { flex: 1, fontSize: 14, color: '#0F2D1F' },

  // ── Dropdown ─────────────────────────────────────────────────────────────

  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C0DCC8',
    marginTop: 4,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f7f4',
    gap: 8,
  },
  dropdownItemAtivo: { backgroundColor: '#e1f5ee' },
  dropdownText: { fontSize: 13, color: '#0F2D1F', flex: 1 },
  dropdownTextAtivo: { color: '#0F6E56', fontWeight: '700' },

  row: { flexDirection: 'row', gap: 10 },

  // ── Botões ────────────────────────────────────────────────────────────────

  btnSalvar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#1D9E75',
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 24,
    elevation: 3,
    shadowColor: '#1D9E75',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  btnSalvarText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    marginTop: 10,
  },
  btnVoltarText: { color: '#5A7D6C', fontSize: 14, fontWeight: '600' },
});