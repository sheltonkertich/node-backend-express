# Coding Problems and Solutions Log

## Table of Contents
- [Entry 1]-ReferenceError-(#entry-1)
- [Entry 2]- (#entry-2)

---

## Entry 1
**Date**: 2024-10-28  
**ErrorName**: ReferenceError - GraphQl.  
**Environment**: Node 20.17.0  
**Error Message**: `ReferenceError: Cannot access 'Entity' before initialization' __metadata("design:type", User) `  

### Solution
1. Used relationship wrapper and worked.

 @OneToOne(() => User,{ onDelete: "CASCADE" })
  @JoinColumn()
  user: Relation<User>;

2. solution link  https://typeorm.io/#relations-in-esm-projects``

### Notes
- If you use ESM in your TypeScript project, you should use the Relation wrapper type in relation properties to avoid circular dependency issues.

*End of Log*