# Coding Problems and Solutions Log

## Table of Contents
- [Entry 1]-ReferenceError-(#entry-1)
- [Entry 2]- (#failed to build with packagemenager error)

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


## Entry 2
**Date**: 2024-11-03  
**ErrorName**: ReferenceError - GraphQl.  
**Environment**: Node 20.17.0  
**Error Message**: `error This project's package.json defines "packageManager": "yarn@3.6.1". However the current global version of Yarn is 1.22.22.`  

### Solution
1. in package json remove the line below. it affects macos


  "packageManager": "yarn@3.6.1+sha512.de524adec81a6c3d7a26d936d439d2832e351cdfc5728f9d91f3fc85dd20b04391c038e9b4ecab11cae2b0dd9f0d55fd355af766bc5c1a7f8d25d96bb2a0b2ca"
}

2. solution link  local

### Notes
- it affects macos, deleting the line helps


*End of Log*