export const roleHierarchy = ['contributor', 'author', 'editor', 'admin'];

export const hasRole = (userRole: string, requiredRole: string): boolean => {
  return roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole);
};
