import { StyleSheet } from 'react-native';

export const stylesGest = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eef5f1',
  },

  /* BLOBS */

  blob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.35,
  },

  blob1: {
    width: 250,
    height: 250,
    backgroundColor: '#9FE1CB',
    top: -60,
    left: -60,
  },

  blob2: {
    width: 220,
    height: 220,
    backgroundColor: '#CECBF6',
    bottom: -50,
    right: -40,
  },

  blob3: {
    width: 160,
    height: 160,
    backgroundColor: '#B5D4F4',
    top: '40%',
    left: -30,
  },

  /* CARD */

  card: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 25,
    padding: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },

    shadowOpacity: 0.08,
    shadowRadius: 20,

    elevation: 6,
  },

  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F2D1F',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#5A7D6C',
    marginTop: 5,
    marginBottom: 25,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 999,

    backgroundColor: '#1D9E75',

    justifyContent: 'center',
    alignItems: 'center',

    alignSelf: 'center',
    marginBottom: 20,
  },

  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#d8e5dd',
    marginVertical: 20,
  },

  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#E1F5EE',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  label: {
    fontSize: 12,
    color: '#3B6D50',
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  value: {
    fontSize: 16,
    color: '#1a2e25',
    marginTop: 3,
  },

  btnVoltar: {
    borderWidth: 1,
    borderColor: '#C0DCC8',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  btnText: {
    color: '#3B6D50',
    fontWeight: '600',
    fontSize: 15,
  },

});