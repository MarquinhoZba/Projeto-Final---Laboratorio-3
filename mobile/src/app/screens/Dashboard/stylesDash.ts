import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.82;

export const stylesDash = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#f0f7f4' },

  loadingContainer: {
    flex: 1, backgroundColor: '#f0f7f4',
    justifyContent: 'center', alignItems: 'center', gap: 14,
  },
  loadingText: { fontSize: 14, color: '#5A7D6C', fontWeight: '500' },

  // ── Blobs ─────────────────────────────────────────────────────────────────

  blob: { position: 'absolute', borderRadius: 1000, opacity: 0.25 },
  blob1: { width: 280, height: 280, backgroundColor: '#9FE1CB', top: -90, right: -90 },
  blob2: { width: 180, height: 180, backgroundColor: '#CECBF6', bottom: 200, left: -70 },

  // ── Topbar ────────────────────────────────────────────────────────────────

  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8f5ee',
    zIndex: 10,
  },
  topbarTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F6E56',
    letterSpacing: -0.4,
  },

  // ── Hambúrguer ────────────────────────────────────────────────────────────

  hamburgerBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#e1f5ee',
    justifyContent: 'center', alignItems: 'center', gap: 4,
  },
  hamburgerLine: {
    width: 22, height: 2,
    backgroundColor: '#0F6E56', borderRadius: 2,
  },

  // ── Avatar ────────────────────────────────────────────────────────────────

  avatarBtn: {
    borderRadius: 50, overflow: 'hidden',
    elevation: 3, shadowColor: '#1D9E75',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, shadowRadius: 6,
  },
  avatarGradient: {
    width: 38, height: 38, borderRadius: 19,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarInitials: { color: '#fff', fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },

  // ── Overlay ───────────────────────────────────────────────────────────────

  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15,45,31,0.45)',
    zIndex: 98,
  },

  // ── Drawer ────────────────────────────────────────────────────────────────

  drawer: {
    position: 'absolute', top: 0, left: 0, bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#fff',
    zIndex: 99,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  drawerHeader: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 52, paddingBottom: 24,
    paddingHorizontal: 20, gap: 14,
  },
  drawerAvatar: {
    width: 46, height: 46, borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
  },
  drawerAvatarText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  drawerNome: { color: '#fff', fontSize: 15, fontWeight: '700' },
  drawerSubtitle: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 },
  drawerClose: { padding: 4 },

  drawerScroll: { flex: 1 },
  drawerSectionLabel: {
    fontSize: 11, fontWeight: '700', color: '#9FE1CB',
    letterSpacing: 1.2, paddingHorizontal: 20,
    paddingTop: 20, paddingBottom: 8,
  },

  drawerItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 13,
    gap: 14,
    borderBottomWidth: 1, borderBottomColor: '#f5fbf8',
  },
  drawerItemIcon: {
    width: 40, height: 40, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
  },
  drawerItemTitle: { fontSize: 14, fontWeight: '700', color: '#0F2D1F' },
  drawerItemDesc:  { fontSize: 11, color: '#5A7D6C', marginTop: 1 },

  drawerBadge: {
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20,
  },
  drawerBadgeText: { fontSize: 10, fontWeight: '700' },

  drawerDivider: {
    height: 1, backgroundColor: '#e8f5ee',
    marginHorizontal: 16, marginVertical: 8,
  },

  // ── Scroll Content ────────────────────────────────────────────────────────

  scrollContent: { padding: 18, paddingBottom: 32 },

  greetingRow: { marginTop: 12, marginBottom: 20 },
  welcome: { fontSize: 24, fontWeight: '700', color: '#0F2D1F', letterSpacing: -0.5 },
  subtitle: { fontSize: 13, color: '#5A7D6C', marginTop: 2 },

  // ── Stat Cards ────────────────────────────────────────────────────────────

  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 10, marginBottom: 16,
  },
  statCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14,
    width: (width - 36 - 10) / 2,
    borderTopWidth: 3, borderTopColor: '#1D9E75',
    borderWidth: 1, borderColor: '#e8f5ee',
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  statIconBox: {
    width: 32, height: 32, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  statValue:  { fontSize: 28, fontWeight: '700', color: '#0F2D1F', lineHeight: 30 },
  statLabel:  { fontSize: 11, color: '#5A7D6C', marginTop: 3, fontWeight: '500' },
  statTrend:  { fontSize: 10, marginTop: 6, fontWeight: '600' },

  // ── Section Card ──────────────────────────────────────────────────────────

  sectionCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 16,
    marginBottom: 14, borderWidth: 1, borderColor: '#e8f5ee',
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  sectionCardHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionCardTitle: { fontSize: 13, fontWeight: '700', color: '#0F2D1F', marginBottom: 12 },
  seeAllText: { fontSize: 12, color: '#1D9E75', fontWeight: '600' },

  // ── Risk Bars ─────────────────────────────────────────────────────────────

  riskRow:   { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  riskLabel: { fontSize: 12, color: '#5A7D6C', width: 44 },
  riskTrack: { flex: 1, height: 8, backgroundColor: '#f0f7f4', borderRadius: 10, overflow: 'hidden' },
  riskFill:  { height: '100%', borderRadius: 10 },
  riskCount: { fontSize: 12, fontWeight: '700', width: 26, textAlign: 'right' },

  // ── Alunos Risco ──────────────────────────────────────────────────────────

  alunoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f5fbf8',
  },
  alunoAvatar: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  alunoAvatarText: { fontSize: 12, fontWeight: '700' },
  alunoNome:  { fontSize: 13, fontWeight: '600', color: '#1a2e25' },
  alunoCurso: { fontSize: 11, color: '#5A7D6C', marginTop: 1 },
  badgeRisco: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  badgeRiscoText: { fontSize: 10, fontWeight: '700' },

  // ── Dica de abrir drawer ──────────────────────────────────────────────────

  drawerHint: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 16,
    padding: 14, paddingHorizontal: 16,
    borderWidth: 1, borderColor: '#e8f5ee',
    gap: 12, marginTop: 4,
    elevation: 1,
  },
  drawerHintIcon: { gap: 4, justifyContent: 'center', alignItems: 'center' },
  drawerHintText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#0F2D1F' },

  // ── Legados (mantidos para não quebrar outros arquivos) ───────────────────

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F2D1F', marginBottom: 12, marginTop: 4 },
  menuGrid: { gap: 10 },
  menuCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 14, paddingHorizontal: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    borderWidth: 1, borderColor: '#e8f5ee', elevation: 2,
  },
  menuIconBox: { width: 46, height: 46, borderRadius: 13, justifyContent: 'center', alignItems: 'center' },
  menuContent: { flex: 1 },
  menuTitle: { fontSize: 14, fontWeight: '700', color: '#1a2e25' },
  menuDesc:  { fontSize: 11, color: '#5A7D6C', marginTop: 2 },
  badge: { paddingHorizontal: 9, paddingVertical: 3, borderRadius: 20 },
  badgeText: { fontSize: 10, fontWeight: '700' },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginTop: 28, paddingVertical: 14, borderRadius: 12, gap: 8,
  },
  logoutText: { color: '#E74C3C', fontWeight: '600', fontSize: 14 },
});